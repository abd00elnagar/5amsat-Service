'use server';

import { supabase } from './db';
import { revalidatePath } from 'next/cache';

function validateProductData(data) {
  if (!data) return null;
  
  // If data is an array, map over it
  if (Array.isArray(data)) {
    return data.map(product => ({
      id: product.id,
      name: product.name || 'Unnamed Product',
      description: product.description || '',
      image: product.image || '/placeholder.png',
      created_at: product.created_at || new Date().toISOString(),
      updated_at: product.updated_at || new Date().toISOString()
    }));
  }
  
  // If data is a single product
  return {
    id: data.id,
    name: data.name || 'Unnamed Product',
    description: data.description || '',
    image: data.image || '/placeholder.png',
    created_at: data.created_at || new Date().toISOString(),
    updated_at: data.updated_at || new Date().toISOString()
  };
}

// ========== Products Services ==========

export async function getAllProducts({ page = 1, limit = 20, random = false, search = '', category = '' } = {}) {
    let query = supabase
        .from('products')
        .select('*');

    // Apply search filter if provided
    if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply category filter if provided
    if (category) {
        query = query.eq('category', category);
    }

    if (random) {
        // For random ordering, we'll use a random id range
        query = query.order('id', { ascending: Math.random() > 0.5 });
    } else {
        query = query.order('created_at', { ascending: false });
    }

    // Add pagination
    const start = (page - 1) * limit;
    query = query.range(start, start + limit - 1);

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

    // Get total count for pagination with the same filters
    let countQuery = supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

    if (search) {
        countQuery = countQuery.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category) {
        countQuery = countQuery.eq('category', category);
    }

    const { count: totalCount } = await countQuery;

    return {
        products: data,
        totalCount,
        hasMore: start + limit < totalCount
    };
}

export async function getProductById(id) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
    return data;
}

export async function createProduct(productData) {
    const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }

    revalidatePath('/dashboard');
    revalidatePath('/');
    return data;
}

export async function updateProduct(id, productData) {
    const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }

    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/edit/${id}`);
    revalidatePath('/');
    return data;
}

export async function deleteProduct(id) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }

    revalidatePath('/dashboard');
    revalidatePath('/');
}

export async function searchProducts(searchTerm) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error searching products:', error);
        throw error;
    }

    return data;
}

export async function updateProductQuantity(id, quantity) {
    const { data, error } = await supabase
        .from('products')
        .update({
            quantity: quantity,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }

    return data;
}

export async function uploadFile(file) {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filename);

        // console.log('Generated public URL (upload):', publicUrl);

        return publicUrl;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

export async function getAllCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
    return data;
}

export async function createCategory({ name }) {
    const { data, error } = await supabase
        .from('categories')
        .insert([{ name }])
        .select()
        .single();

    if (error) {
        console.error('Error creating category:', error);
        throw error;
    }

    revalidatePath('/dashboard/categories');
    return data;
}

export async function deleteCategory(id) {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting category with id ${id}:`, error);
        throw error;
    }

    revalidatePath('/dashboard/categories');
}

export async function getRelatedProducts(productId, category, limit = 4) {
    if (!category) return { products: [], otherProducts: [] };

    // Get products in the same category
    const { data: relatedProducts, error: relatedError } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .neq('id', productId)
        .limit(limit);

    if (relatedError) {
        console.error('Error fetching related products:', relatedError);
        throw relatedError;
    }

    // If we don't have enough related products, get some random products
    if (!relatedProducts || relatedProducts.length < limit) {
        const remainingCount = limit - (relatedProducts?.length || 0);
        const { data: otherProducts, error: otherError } = await supabase
            .from('products')
            .select('*')
            .neq('id', productId)
            .neq('category', category)
            .limit(remainingCount);

        if (otherError) {
            console.error('Error fetching other products:', otherError);
            throw otherError;
        }

        return {
            products: relatedProducts || [],
            otherProducts: otherProducts || []
        };
    }

    return {
        products: relatedProducts,
        otherProducts: []
    };
} 
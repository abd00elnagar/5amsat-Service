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

export async function getAllProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
    return data;
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
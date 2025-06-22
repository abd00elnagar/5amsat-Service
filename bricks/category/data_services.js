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
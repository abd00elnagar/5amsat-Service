export async function getAllOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
    return data;
}

export async function getOrderById(id) {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching order with id ${id}:`, error);
        throw error;
    }
    return data;
}

export async function createOrder(orderData) {
    const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

    if (error) {
        console.error('Error creating order:', error);
        throw error;
    }

    revalidatePath('/dashboard/orders');
    return data;
}

export async function updateOrder(id, orderData) {
    const { data, error } = await supabase
        .from('orders')
        .update(orderData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(`Error updating order with id ${id}:`, error);
        throw error;
    }

    revalidatePath('/dashboard/orders');
    revalidatePath(`/dashboard/orders/edit/${id}`);
    return data;
}

export async function deleteOrder(id) {
    const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting order with id ${id}:`, error);
        throw error;
    }

    revalidatePath('/dashboard/orders');
} 
import { supabase } from '@/lib/supabase';
import type { Customer, Product, Campaign, Subscription } from './types';

// Customers
export const getCustomers = async () => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*, subscriptions(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as (Customer & { subscriptions: Subscription[] })[];
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*, subscriptions(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Customer & { subscriptions: Subscription[] };
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};

// Products
export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const createProduct = async (product: Partial<Product>) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};

// Dashboard Stats
export const getRevenue = async () => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('amount')
      .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());

    if (error) throw error;
    return data.reduce((sum, payment) => sum + payment.amount, 0);
  } catch (error) {
    console.error('Error fetching revenue:', error);
    return 0;
  }
};

export const getMonthlyRevenue = async () => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('amount, created_at')
      .gte('created_at', new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString());

    if (error) throw error;

    const monthlyData = new Array(12).fill(0);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    data.forEach(payment => {
      const date = new Date(payment.created_at);
      monthlyData[date.getMonth()] += payment.amount;
    });

    return months.map((name, index) => ({
      name,
      total: monthlyData[index]
    }));
  } catch (error) {
    console.error('Error fetching monthly revenue:', error);
    return [];
  }
};

export const getActiveSubscriptions = async () => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active');

    if (error) throw error;
    return data.length;
  } catch (error) {
    console.error('Error fetching active subscriptions:', error);
    return 0;
  }
};

export const getTotalSales = async () => {
  try {
    const { count, error } = await supabase
      .from('payments')
      .select('*', { count: 'exact' });

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching total sales:', error);
    return 0;
  }
};

export const getActiveUsers = async () => {
  try {
    const { count, error } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact' })
      .gte('created_at', new Date(new Date().setHours(new Date().getHours() - 1)).toISOString());

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching active users:', error);
    return 0;
  }
};

export const getRecentSales = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        customers (
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching recent sales:', error);
    return [];
  }
};
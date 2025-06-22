import { clerkClient } from '@clerk/nextjs';

// Helper function to check if user is admin
export async function isAdmin(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user.publicMetadata?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Helper function to get user role
export async function getUserRole(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user.publicMetadata?.role || 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user';
  }
}

// Helper function to set user role
export async function setUserRole(userId, role) {
  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role }
    });
    return true;
  } catch (error) {
    console.error('Error setting user role:', error);
    return false;
  }
}

// Helper function to get user data
export async function getUserData(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.publicMetadata?.role || 'user',
      imageUrl: user.imageUrl
    };
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

// Helper function to list all users (admin only)
export async function getAllUsers() {
  try {
    const users = await clerkClient.users.getUserList();
    return users.map(user => ({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.publicMetadata?.role || 'user',
      imageUrl: user.imageUrl,
      createdAt: user.createdAt
    }));
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
}

// Helper function to delete user (admin only)
export async function deleteUser(userId) {
  try {
    await clerkClient.users.deleteUser(userId);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

// Helper function to create user (admin only)
export async function createUser(userData) {
  try {
    const user = await clerkClient.users.createUser({
      emailAddress: [userData.email],
      firstName: userData.firstName,
      lastName: userData.lastName,
      publicMetadata: { role: userData.role || 'user' }
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
} 
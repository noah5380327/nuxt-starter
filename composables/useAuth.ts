import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)

  const supabase = useSupabaseClient()
  const { apiRequest } = useApi()

  const getCurrentUser = async (): Promise<User | null> => {
    const result = await apiRequest(async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()
      user.value = currentUser
      return currentUser
    })

    return result.data || null
  }

  const signInWithEmail = async (email: string, password: string) => {
    return await apiRequest(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      user.value = data.user
      return data.user
    })
  }

  const signUpWithEmail = async (email: string, password: string) => {
    return await apiRequest(async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      })

      if (error) throw error
      return data.user
    })
  }

  const resetPasswordForEmail = async (email: string) => {
    return await apiRequest(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
    })
  }

  const getResetLinkSession = async () => {
    return await apiRequest(async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) throw error

      if (!session) {
        throw new Error('The reset link is invalid or expired. Please request a reset email again.')
      }
    })
  }

  const updateUserPassword = async (password: string) => {
    return await apiRequest(async () => {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error
    })
  }

  const signOut = async () => {
    return await apiRequest(async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      user.value = null
      await navigateTo('/auth/login')
    })
  }

  return {
    user: readonly(user),
    signInWithEmail,
    signUpWithEmail,
    resetPasswordForEmail,
    getResetLinkSession,
    updateUserPassword,
    signOut,
    getCurrentUser,
  }
}

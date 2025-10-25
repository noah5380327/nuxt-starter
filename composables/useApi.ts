export const useApi = () => {
  const toast = useToast()

  const apiRequest = async (supabase: any, showErrorToast: boolean = true) => {
    try {
      const result = await supabase()
      return {
        success: true,
        data: result,
      }
    } catch (error: any) {
      if (showErrorToast) {
        toast.add({
          title: 'Request failed',
          description: error.message,
          color: 'error',
        })
      }
      return {
        success: false,
        error: error.message,
      }
    }
  }

  return {
    apiRequest,
  }
}

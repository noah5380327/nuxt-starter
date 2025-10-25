export default defineNuxtRouteMiddleware(async () => {
  const { user, getCurrentUser } = useAuth()

  if (!user.value) {
    await getCurrentUser()
  }
})

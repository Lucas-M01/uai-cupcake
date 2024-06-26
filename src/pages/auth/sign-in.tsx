import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  async function handleAuthenticate({ email, password }: SignInSchema) {
    try {
      if (
        email === 'lucas.montenegro.n@outlook.com' &&
        password === '123456789'
      ) {
        return navigate('/')
      }

      return toast.error('Credenciais inválidas')
    } catch (err) {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(handleAuthenticate)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register('email')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Sua senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
                <Link
                  to="/forget-password"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Acessar painel
              </Button>
              <Link to="/sign-up">
                <Button className="w-full" variant="outline">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

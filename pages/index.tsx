import Image from 'next/image'
import { Inter } from 'next/font/google'
import ProtectedRoute from '@/components/common/protectedRoute'
import Layout from '@/components/common/layout/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
    <ProtectedRoute>
    <div className="flex py-2 container mx-auto">
      <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
        <h2 className="text-2xl font-semibold">You are logged in!</h2>
      </div>
    </div>
    </ProtectedRoute>
    </Layout>
  )
}

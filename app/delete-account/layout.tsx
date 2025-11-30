import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delete Account',
  description: 'Learn how to delete your FitsCheck account. Account deletion must be done through the mobile app.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


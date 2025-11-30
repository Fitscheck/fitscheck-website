'use client'

import { useState } from 'react'
import { Download, Smartphone, AlertCircle } from 'lucide-react'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function DeleteAccountPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [platform, setPlatform] = useState<'iOS' | 'Android' | null>(null)

  const handleDownloadClick = (platformType: 'iOS' | 'Android') => {
    setPlatform(platformType)
    setIsModalOpen(true)
  }
  return (
    <>
      <section className="min-h-screen bg-white py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-4"
                style={{ fontFamily: "var(--font-whyte-inktrap)" }}
              >
                Delete Your Account
              </h1>
              <p className="text-lg text-[#A3A3A3]" style={{ fontFamily: "var(--font-satoshi)" }}>
                Account deletion must be done through the FitsCheck mobile app
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-8" style={{ fontFamily: "var(--font-satoshi)" }}>
              {/* Alert Box */}
              <div className="bg-[#FEFBD7] border-l-4 border-[#F8E71C] p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-[#003366] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] mb-2" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
                      Important Notice
                    </h3>
                    <p className="text-[#003366]/80 leading-relaxed">
                      To delete your FitsCheck account, you must log in to the mobile app. Account deletion cannot be processed through this website for security reasons.
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-[#F0F7FF] rounded-2xl p-8 space-y-6">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#003366] mb-6"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  How to Delete Your Account
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#003366] mb-2">Open the FitsCheck App</h3>
                      <p className="text-[#003366]/80 leading-relaxed">
                        Launch the FitsCheck mobile app on your iOS or Android device.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#003366] mb-2">Log In to Your Account</h3>
                      <p className="text-[#003366]/80 leading-relaxed">
                        Make sure you're logged in to the account you want to delete.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#003366] mb-2">Navigate to Settings</h3>
                      <p className="text-[#003366]/80 leading-relaxed">
                        Go to your profile settings or account settings within the app.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#003366] mb-2">Select Delete Account</h3>
                      <p className="text-[#003366]/80 leading-relaxed">
                        Find and select the "Delete Account" option.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-lg">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#003366] mb-2">Confirm Deletion</h3>
                      <p className="text-[#003366]/80 leading-relaxed">
                        Follow the prompts to confirm your account deletion. This action is permanent and cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download App Section */}
              <div className="bg-gradient-to-br from-[#003366] to-[#002244] rounded-2xl p-8 text-white text-center space-y-6">
                <div className="flex justify-center mb-4">
                  <Smartphone className="h-16 w-16 text-[#F8E71C]" />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  Don't Have the App?
                </h2>
                <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                  Download the FitsCheck app to access your account settings and delete your account.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => handleDownloadClick('iOS')}
                    className="bg-[#F8E71C] hover:bg-[#F8E71C]/90 text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download for iOS
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => handleDownloadClick('Android')}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-[#003366] px-8 py-6 rounded-full text-lg font-bold"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download for Android
                  </Button>
                </div>
              </div>

              {/* What Happens Section */}
              <div className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#003366] mb-4"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  What Happens When You Delete Your Account?
                </h2>
                <div className="bg-white border-2 border-[#003366]/20 rounded-lg p-6 space-y-4">
                  <ul className="list-disc list-inside space-y-3 text-[#003366]/80 ml-4">
                    <li>Your account and all associated data will be permanently deleted</li>
                    <li>All your posts, comments, and content will be removed</li>
                    <li>Your profile will no longer be visible to other users</li>
                    <li>You will lose access to your style points and leaderboard rankings</li>
                    <li>Any pending affiliate commissions may be forfeited</li>
                    <li>This action cannot be undone</li>
                  </ul>
                  <div className="mt-6 p-4 bg-[#FEFBD7] rounded-lg">
                    <p className="text-[#003366] font-semibold">
                      Note: If you have any pending transactions or commissions, please resolve them before deleting your account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Need Help Section */}
              <div className="bg-[#F0F7FF] rounded-lg p-6">
                <h3
                  className="text-xl font-bold text-[#003366] mb-3"
                  style={{ fontFamily: "var(--font-whyte-inktrap)" }}
                >
                  Need Help?
                </h3>
                <p className="text-[#003366]/80 mb-4">
                  If you're having trouble accessing the app or have questions about account deletion, please contact our support team.
                </p>
                <p className="text-[#003366]">
                  Email:{' '}
                  <a href="mailto:support@fitscheck.com" className="text-[#003366] underline hover:text-[#F8E71C] font-semibold">
                    support@fitscheck.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white border-2 border-[#003366]/20">
          <DialogHeader>
            <DialogTitle
              className="text-2xl font-bold text-[#003366] text-center"
              style={{ fontFamily: "var(--font-whyte-inktrap)" }}
            >
              Coming Soon!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center pt-4 space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#FEFBD7] flex items-center justify-center">
                <Smartphone className="h-10 w-10 text-[#003366]" />
              </div>
            </div>
            <p className="text-lg text-[#003366]/80" style={{ fontFamily: "var(--font-satoshi)" }}>
              The FitsCheck app for {platform} is coming soon! 
            </p>
            <p className="text-base text-[#003366]/70" style={{ fontFamily: "var(--font-satoshi)" }}>
              Join our waitlist to be notified when the app launches.
            </p>
            <div className="pt-4">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#003366] hover:bg-[#003366]/90 text-white px-6 py-3 rounded-full font-bold w-full"
              >
                Got it
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  )
}


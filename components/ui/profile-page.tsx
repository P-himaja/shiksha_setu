"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Camera, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/ui/navigation"

type PageType = "home" | "contact" | "profile"

interface ProfilePageProps {
  setCurrentPage: (page: PageType) => void
}

export const ProfilePage = ({ setCurrentPage }: ProfilePageProps) => {
  const { user, userProfile, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [profileData, setProfileData] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    grade: userProfile?.grade || "",
    school: userProfile?.school || "",
    subjects: userProfile?.subjects || "",
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      await updateProfile(profileData)
      setSuccess("Profile updated successfully!")
    } catch (error: any) {
      setError(error.message || "Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Navigation currentPage="profile" setCurrentPage={setCurrentPage} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Please Sign In</h1>
            <p className="text-xl text-gray-600 mb-8">You need to be signed in to view your profile.</p>
            <Button
              onClick={() => setCurrentPage("home")}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation currentPage="profile" setCurrentPage={setCurrentPage} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-xl text-gray-600">Manage your account settings and preferences</p>
        </div>

        {success && (
          <Alert className="mb-6" variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <Card className="border-blue-200">
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user.photoURL || "/placeholder.svg?height=96&width=96"} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name ? (
                      profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    ) : (
                      <User className="w-8 h-8" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                  variant="outline"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle>{profileData.name || "User"}</CardTitle>
              <CardDescription>{profileData.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.grade && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Grade:</span>
                    <Badge variant="secondary">{profileData.grade}</Badge>
                  </div>
                )}
                {profileData.school && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">School:</span>
                    <span className="text-sm font-medium">{profileData.school}</span>
                  </div>
                )}
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Learning Progress</p>
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <p className="text-xs text-gray-500">Overall mastery</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade">Grade/Class</Label>
                      <Input
                        id="grade"
                        name="grade"
                        value={profileData.grade}
                        onChange={handleInputChange}
                        placeholder="e.g., Class 12"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="school">School/Institution</Label>
                    <Input
                      id="school"
                      name="school"
                      value={profileData.school}
                      onChange={handleInputChange}
                      placeholder="Enter your school name"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subjects">Subjects of Interest</Label>
                    <Input
                      id="subjects"
                      name="subjects"
                      value={profileData.subjects}
                      onChange={handleInputChange}
                      placeholder="e.g., Mathematics, Physics, Chemistry"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Profile"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setCurrentPage("home")} disabled={isLoading}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

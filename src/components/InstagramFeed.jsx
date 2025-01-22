import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Instagram } from 'lucide-react'

export default function InstagramFeed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchPosts() {
    try {
      const response = await fetch('/api/instagram')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setPosts(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
    const interval = setInterval(fetchPosts, 300000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl lg:text-4xl">
            <Instagram className="w-6 h-6 lg:w-8 lg:h-8" />
            Latest Instagram Posts & Highlights
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-center h-64">Loading reviews...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl lg:text-4xl">
            <Instagram className="w-6 h-6 lg:w-8 lg:h-8" />
            Latest Instagram Posts & Highlights
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-center h-64 text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    )
  }

  const photoPosts = posts.filter((post) => post.media_type === 'IMAGE')
  const videoPosts = posts.filter((post) => post.media_type === 'VIDEO')

  return (
    <section className="bg-white">
      <Card className="w-full border-0 shadow-none container mb-3 mx-auto">
      <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl lg:text-4xl">
            <Instagram className="w-6 h-6 lg:w-8 lg:h-8" />
            Latest Instagram Posts & Highlights
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ScrollArea className="h-[600px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <InstagramPost key={post.id} post={post} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="photos">
              <ScrollArea className="h-[600px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photoPosts.map((post) => (
                    <InstagramPost key={post.id} post={post} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="videos">
              <ScrollArea className="h-[600px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videoPosts.map((post) => (
                    <InstagramPost key={post.id} post={post} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

function InstagramPost({ post }) {
    return (
      <Card className="overflow-hidden relative aspect-auto sm:aspect-[4/5]">
        <div className="relative w-full">
          {post.media_type === 'VIDEO' ? (
            <video className="w-full h-auto object-cover" controls src={post.media_url} />
          ) : (
            <img
              className="w-full h-auto object-cover"
              src={post.media_url}
              alt={post.caption?.slice(0, 100) || 'Instagram post'}
            />
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{post.caption || 'No caption'}</p>
          <Separator className="my-2" />
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            <Instagram className="w-4 h-4" />
            View on Instagram
          </a>
        </CardContent>
      </Card>
    )
  }
  

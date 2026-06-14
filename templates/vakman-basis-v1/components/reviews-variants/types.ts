export interface Review {
  author: string
  initials: string
  text: string
  rating: number
  date: string
  photoUrl?: string
}

export interface ReviewsProps {
  businessName?: string
  reviews: Review[]
  reviewCount: number
  reviewRating: number
  sourceUrl?: string
  primaryColor: string
  accentColor?: string
}

import { cn } from '@/app/utils/cn'
import { FC, memo } from 'react'

interface mapProps {
    className?: string,
}

const Map: FC<mapProps> = memo((className) => {
    return (
        <div className={cn("relative w-full h-95 rounded-2xl overflow-hidden shadow-lg", className)}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d439.48801399473416!2d83.9678149432299!3d28.2102257302467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595004132e68b%3A0xb002e17ef39e7a94!2sLight%20to%20the%20nations%20Emmanuel%20church!5e0!3m2!1sen!2snp!4v1768836260009!5m2!1sen!2snp"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Grace Springs Church Location"
            />
        </div>
    )
})

export default Map

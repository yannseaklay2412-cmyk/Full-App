import './ServiceCard.css'

export default function ServiceCard({
  serviceName = 'Teeth Cleaning',
  description = 'A gentle deep-cleaning session that removes plaque and tartar buildup, leaving your teeth fresh and healthy.',
  price = '$50',
  duration = '30 min',
  reverse = false,
  image = '',
}) {
  return (
    <div className={`sc-card ${reverse ? 'sc-card-reverse' : ''}`}>

      {/* Image — left by default, right when reverse is true.
          Shows the real photo if one was uploaded, otherwise the placeholder. */}
      <div className="sc-card-image">
        {image ? (
          <img src={image} alt={serviceName} className="sc-card-image-photo" />
        ) : (
          <span>Image</span>
        )}
      </div>

      {/* Text content — right by default, left when reverse is true */}
      <div className="sc-card-info">
        <h2 className="sc-card-name">{serviceName}</h2>
        <p className="sc-card-description">{description}</p>

        <div className="sc-card-details">
          <div className="sc-card-detail">
            <span className="sc-card-detail-label">Price</span>
            <span className="sc-card-detail-value">{price}</span>
          </div>
          <div className="sc-card-detail">
            <span className="sc-card-detail-label">Duration</span>
            <span className="sc-card-detail-value">{duration}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

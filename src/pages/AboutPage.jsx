import Card from '../components/shared/Card'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About this project</h1>
        <p>This is a React app for leaving feedback on a product or service</p>
        <p>Version: 1.0.0</p>
      </div>
      <p>
        <a href="/">Home</a>
      </p>
    </Card>
  )
}

export default AboutPage

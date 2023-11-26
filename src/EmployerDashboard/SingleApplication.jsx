import { React} from 'react';
import Card from 'react-bootstrap/Card';
import '../Components/groupPosting.css';
function Application(props) {
  const handleDownload = async () => {
   
      const link = document.createElement('a');
      link.href = props.url;
      link.download = 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } 

  return (
    <span>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.firstName}{` `}{props.lastName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.email}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{props.phone}</Card.Subtitle>
          <div>
              <iframe
                title="File Preview"
                src={props.url}
                width="200"
                height="200"
              />
              <button onClick={handleDownload}>
              Download PDF
              </button>
          </div>
        </Card.Body>
      </Card>
    </span>
  );
}


export default Application;
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <div className={classes.detail}>
      <img src={props.image} alt={props.title}></img>
      <h1>{props.title}</h1>
      <p>{props.address}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default MeetupDetail;

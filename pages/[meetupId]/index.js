import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetailsPage = (props) => {
  if (!props.meetupDetail){
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{props.meetupDetail.title}</title>
        <meta name="description" content={props.meetupDetail.description} />
      </Head>
      <MeetupDetail
        image={props.meetupDetail.image}
        title={props.meetupDetail.title}
        address={props.meetupDetail.address}
        description={props.meetupDetail.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-surabhi:test123@cluster0.8hn5axk.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://admin-surabhi:test123@cluster0.8hn5axk.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId.createFromHexString(meetupId),
  });

  if (!selectedMeetup) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      meetupDetail: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title || 'No title',
        image: selectedMeetup.image || '',
        description: selectedMeetup.description || 'No description',
        address: selectedMeetup.address || 'No address',
      },
    },
  };
};

export default MeetupDetailsPage;
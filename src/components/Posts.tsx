import { useEffect, useState } from "react";

const ITEM_URL = `https://hacker-news.firebaseio.com/v0/item/ITEMID.json?print=pretty`;

type postDetailsType = {
  by: string;
  descedants: number;
  id: number;
  kids: [];
  score: number;
  title: string;
  type: string;
  url: string;
};

function Posts({ results }: { results: [] }): JSX.Element {
  const [postDetails, setPostDetails] = useState<postDetailsType[]>([]);

  useEffect(() => {
    if (results.length > 0) {
      fetchDetails();
    }
  }, [results]);

  useEffect(() => {
    console.log(postDetails);
  }, [postDetails]);

  const fetchDetails = async () => {
    let allDetails: postDetailsType[] = [];

    for (let i = 0; i < results.length; i++) {
      let details: postDetailsType = await fetch(
        ITEM_URL.replace("ITEMID", results[i] + "")
      ).then((res) => res.json());
      allDetails.push(details);
    }
    setPostDetails([...allDetails]);
  };

  return (
    <>
      {postDetails.map((details: postDetailsType) => {
        return (
          <div key={details.id}>
            <a href={details.url} target="_blank">
              {details.title}
            </a>
            <p>Author: {details.by}</p>
          </div>
        );
      })}
    </>
  );
}

export default Posts;

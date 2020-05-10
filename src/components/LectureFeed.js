import React, { useState, useEffect } from 'react';

import Lecture from './Lecture';

function LectureFeed() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    // TODO: fix credentials
    fetch('http://127.0.0.1:5000/api/v1/lectures/', { credentials: 'omit' })
      .then((res) => res.json())
      .then((data) => setLectures(data))
      .catch((err) => console.log(err));
  }, []);

  const lecComps = lectures.map((lec) => (
    <div key={lec.lecture_id}>
      <Lecture lecture_id={lec.lecture_id} />
    </div>
  ));
  return (
    <div>{lecComps}</div>
  );
}

export default LectureFeed;
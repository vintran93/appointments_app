import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import classes from '../styles/Doctors.module.css';
import getDoctors from '../actions/user';

function DoctorsList()  {
  const { doctors } = useSelector(state => state.user);
  const { message } = useSelector(state => state.message);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (doctors.length === 0) {
      setLoading(true);
      dispatch(getDoctors())
        .then(() => {
          setSuccessful(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [doctors, dispatch]);

  const doctorsList = doctors.map(doctor => (
    <div key={doctor.id}>
      <Link to={`/doctors/${doctor.id}`} className={classes.Doctors}>
        <div className="d-flex flex-column align-items-center">
          <img src={doctor.image} alt={doctor.name} className={`rounded-circle ${classes.img}`} />
          <h5 className={`text-dark p-4 ${classes.border}`}>{doctor.name}</h5>
          <p className="text-secondary mt-3">
            <strong>Specialty:&nbsp;</strong>
            {doctor.specialty}
          </p>
          <p className="text-secondary mt-3">
            <strong>Education:&nbsp;</strong>
            {doctor.education}
          </p>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="container text-center">
      {loading && <span className="spinner-border spinner-border-lg" />}
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        // centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        // draggable
        focusOnSelect={false}
        // infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        // showDots={false}
        sliderClass=""
        slidesToSlide={1}
        // swipeable
      >
        {doctorsList}
      </Carousel>
      {message && (
        <div className="form-group">
          <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;


// const DoctorsList = ({ doctors }) => {
//   <Link>
//     <div>
//         {doctors.map(doctor => 
//         <ul>
//             <li key={doctor.id}></li>
//             <li>{doctor.name}</li>    
//             <li>{doctor.education}</li>
//             <li>{doctor.specialty}</li>
//             <li>{doctor.experience}</li>
//             <li>{doctor.address}</li>
//             <li><img src={doctor.image} alt={doctor.name} className={`rounded-circle ${classes.image}`} /></li>
//         </ul>)}
//     </div>
//   </Link>
// }

// const doctorsList = doctors.map(doctor => (
//   <div key={doctor.id}>
//     <Link to={`/doctors/${doctor.id}`} className={classes.Doctors}>
//       <div className="d-flex flex-column align-items-center">
//         <img src={doctor.image} alt={doctor.name} className={`rounded-circle ${classes.img}`} />

//         <h5 className={`text-dark p-4 ${classes.border}`}>{doctor.name}</h5>
//         <p className="text-secondary mt-3">
//           <strong>Specialty:&nbsp;</strong>
//           {doctor.specialty}
//         </p>
//         <p className="text-secondary mt-3">
//           <strong>Education:&nbsp;</strong>
//           {doctor.education}
//         </p>
//       </div>
//     </Link>
//   </div>
// ));
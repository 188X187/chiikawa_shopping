// import React, { useState } from 'react';
// import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

// function Calendar(props) {
//     const today = new Date().getDate();

//     const dates = [
//         ['', '', '', 1, 2, 3, 4],
//         [5, 6, 7, 8, 9, 10, 11],
//         [12, 13, 14, 15, 16, 17, 18],
//         [19, 20, 21, 22, 23, 24, 25],
//         [26, 27, 28, 29, 30, 31, '']
//     ];
//     const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

//     const [selectedDate, setSelectedDate] = useState(null);

//     const handleDateClick = (date) => {
//         setSelectedDate(date);
//         console.log("Selected Date:", date);
//         props.setDeliveryDate(date);
//     };

//     return (
//         <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     배송 희망일
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body className="grid-example">
//                 <Container>
//                     <Row>
//                         {daysOfWeek.map((day, index) => (
//                             <Col key={index} className='border text-center p-2'>
//                                 {day}
//                             </Col>
//                         ))}
//                     </Row>
//                     {dates.map((week, idx) => (
//                         <Row key={idx}>
//                             {week.map((date, colIndex) => (
//                                 <Col
//                                     key={colIndex}
//                                     className={`border text-center p-2 ${date === today ? 'border-primary' : ''} ${date === selectedDate ? 'bg-success text-white' : ''}`}
//                                     onClick={() => handleDateClick(date)}
//                                     style={{ cursor: 'pointer' }}
//                                 >
//                                     {date}
//                                 </Col>
//                             ))}
//                         </Row>
//                     ))}
//                 </Container>
//             </Modal.Body>
//             <Modal.Footer className='w-100 justify-content-center'>
//                 <Button className='w-50' onClick={props.onHide}>
//                     {selectedDate ? `${selectedDate}일 선택` : '선택'}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

// export default Calendar;

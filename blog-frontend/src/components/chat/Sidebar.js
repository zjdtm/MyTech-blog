import { AppContext } from 'context/appContext';
import { alarmOff, alarmOn } from 'features/auth/authSlice';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      return alert('Please Login');
    }
    socket.emit('join-room', room);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    dispatch(alarmOff(room));

    socket.off('alarmOn').on('alarmOn', (room) => {
      dispatch(alarmOn(room));
    });
  };

  useEffect(() => {
    if (user) {
      setCurrentRoom('community');
      getRooms();
      socket.emit('join-room', 'community');
      socket.emit('new-user');
    }
  }, []);

  socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload);
  });

  const getRooms = () => {
    fetch('http://localhost:4000/api/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + '-' + id2;
    } else {
      return id2 + '-' + id1;
    }
  };

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2>Availabe rooms</h2>
      <ListGroup>
        {rooms
          ? rooms.map((room, idx) => (
              <ListGroup.Item
                key={idx}
                onClick={() => joinRoom(room)}
                active={room === currentRoom}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {room}
                {/* {currentRoom !== room && <span>{user.newMessages[room]}</span>} */}
              </ListGroup.Item>
            ))
          : null}
      </ListGroup>
      <h2>Members</h2>
      {members.map((member) => (
        <ListGroup.Item
          key={member._id}
          style={{ cursor: 'pointer' }}
          active={privateMemberMsg?._id === member?._id}
          onClick={() => handlePrivateMemberMsg(member)}
          disabled={member._id === user._id}
        >
          {member.username}
        </ListGroup.Item>
      ))}
    </>
  );
};

export default Sidebar;

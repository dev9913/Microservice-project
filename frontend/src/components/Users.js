import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_USER_API ;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/users`);
    setUsers(res.data);
  };

  const createUser = async () => {
    if (!name || !email) return alert("Fill all fields");

    await axios.post(`${API_URL}/users`, { name, email });
    setName("");
    setEmail("");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>👤 Users</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button className="btn-user" onClick={createUser}>
        Add User
      </button>

      {users.length === 0 ? (
        <p className="empty">No users yet</p>
      ) : (
       <div className="list">
  {users.map(u => (
    <div key={u._id} className="item">
      <div className="item-title">{u.name}</div>
      <div className="meta">{u.email}</div>
      <div className="meta">User ID: {u._id}</div>
    </div>
  ))}
</div> 
      )}
    </div>
  );
}

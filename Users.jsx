import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers)
    console.log(users);

    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/users/${id}`,{
            method: 'DELETE',
            
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0) {
                alert("Deleted successfully");
                const remaining = users.filter(user => user._id !== id)
                setUsers(remaining);
            }
        })
    }

    return (
        <div>
            users : {users.length}

            <div>
                {
                    users.map(user => <p key={user._id}>{user.name}
                    <Link to={`/update/${user._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => handleDelete(user._id)}>X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Users;
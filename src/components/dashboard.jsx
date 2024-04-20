import React from 'react';

function DashboardPage(user) {
    user = user.board
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Email: {user.Email}</p>
                <p>Password: {user.password}</p>
                <p>Objective: {user.objective}</p>
                <p>First Name: {user.FirstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Height: {user.height}</p>
                <p>Weight: {user.weight}</p>
                <p>Weeks: {user.weeks}</p>
            </div>
          );   
}

export default DashboardPage;

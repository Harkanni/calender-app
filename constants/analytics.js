import { Users } from './users';

export const Analytics = [
  {
    title: 'Clients',
    count: '1259',
    desc: 'Total clients'
  },
  {
    title: 'Bookings',
    count: '1259',
    desc: 'Total Bookings'
  },
  {
    title: 'Pending',
    count: '1259',
    desc: 'Total Pending'
  },
  {
    title: 'Revenue',
    count: '$1259',
    desc: 'Total Revenue'
  }
];

export const countUserStatus = (users) => {
  let totalUsers = users.length;
  let pendingUsers = 0;
  let confirmedUsers = 0;

  // Iterate through the users array
  users.forEach((user) => {
    // Check the status of each user and increment the corresponding counter
    if (user.status === 'pending') {
      pendingUsers++;
    } else if (user.status === 'confirmed') {
      confirmedUsers++;
    }
  });

  return [
    {
      title: 'Clients',
      count: totalUsers,
      desc: 'Total clients'
    },
    {
      title: 'Bookings',
      count: confirmedUsers,
      desc: 'Total Bookings'
    },
    {
      title: 'Pending',
      count: pendingUsers,
      desc: 'Total Pending'
    },
    {
      title: 'Revenue',
      count: '$1259',
      desc: 'Total Revenue'
    }
  ];
};

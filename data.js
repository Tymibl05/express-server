export const data = {
  users: [
    {
      id: 1,
      trust: true,
      name: 'Dell',
      employees: [
        {
          id: 1,
          name: 'John Doe',
          email: 'vendorName@gmail.com',
          activity: [],
        },
        {
          id: 2,
          name: 'Mary Jane',
          email: 'vendorName@gmail.com',
          activity: [],
        },
        {
          id: 3,
          name: 'Joe Momma',
          email: 'vendorName@gmail.com',
          activity: [],
        },
        {
          id: 4,
          name: 'Hu Sma',
          email: 'vendorName@gmail.com',
          activity: [],
        },
        {
          id: 5,
          name: 'Michael Leroux',
          email: 'vendorName@gmail.com',
          activity: [],
        },
        {
          id: 6,
          name: 'Samael Martinez',
          email: 'vendorName@gmail.com',
          activity: [],
        },
        {
          id: 7,
          name: 'Madison Moore',
          email: 'vendorName@gmail.com',
          activity: [],
        },
      ],
      tasks: [
        {
          id: 111,
          description: 'Replacing switches in main data center hall.',
          requested: '05/11/2022 12:37:02',
          status: 'completed',
          timeFrame: {
            startDate: '06/29/2022',
            endDate: '',
            startTime: '10:30:00',
            endTime: '18:30:00',
          },
          employees: [
            {
              id: 5,
              name: 'Michael Leroux',
              checkIn: ['checkIn1', 'checkIn2'],
              checkOut: ['checkOut1', 'checkOut2'],
            },
            {
              id: 6,
              name: 'Samael Martinez',
              checkIn: ['checkIn1'],
              checkOut: ['checkOut1'],
            },
            {
              id: 2,
              name: 'Mary Jane',
              checkIn: ['checkIn1'],
              checkOut: [],
            },
          ],
        },
        {
          id: 222,
          description: 'Updating db to v.10.0.2 in main data center hall.',
          requested: '07/15/2022 18:32:12',
          status: 'active',
          timeFrame: {
            startDate: '07/29/2022',
            endDate: '',
            startTime: '12:30:00',
            endTime: '18:30:00',
          },
          employees: [
            {
              id: 1,
              name: 'John Doe',
              checkIn: ['checkIn1'],
              checkOut: [],
            },
          ],
        },
        {
          id: 333,
          description:
            'A brief description of what the task is meant to accomplish.',
          requested: '09/21/2022 15:51:45',
          status: 'pending',
          timeFrame: {
            startDate: '09/30/2022',
            endDate: '10/03/2022',
            startTime: '08:30:00',
            endTime: '16:30:00',
          },
          employees: [
            {
              id: 7,
              name: 'Madison Moore',
              checkIn: [],
              checkOut: [],
            },
            {
              id: 3,
              name: 'Joe Momma',
              checkIn: [],
              checkOut: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      trust: false,
      name: 'Vendor2',
      employees: [],
      tasks: [],
    },
    {
      id: 3,
      trust: false,
      name: 'Vendor3',
      employees: [],
      tasks: [],
    },
  ],
};

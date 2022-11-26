import { getCol } from '../../db/mongo.js';
import express from 'express';
import { ObjectId } from 'mongodb';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const col = await getCol('requests');
    const requests = await col.find().toArray();
    res.send(requests);
  } catch (err) {
    console.log(err);
  }
});

router.post('/new', async (req, res) => {
  const { description, timeframe, visitors } = req.body;

  const validate = (req) => {
    const getUserInfo = async (uid) => {
      console.log('getting user info');
      try {
        const userCol = await getCol('users');
        const user = await userCol.findOne({ _id: ObjectId(uid) });
        const companyCol = await getCol('companies');
        const company = await companyCol.findOne({
          _id: ObjectId(user.company_id),
        });

        const userName = user.name;
        const companyName = await company.name;

        return { userName, companyName };
      } catch (error) {
        console.log(error);
      }
    };

    req.visitors.map(async (vis) => {
      const { userName, companyName } = await getUserInfo(vis.user_id);
      vis.user_name = userName;
      vis.company_name = companyName;
      vis.is_onsite = false;
      vis.badges = [];
      console.log(vis);
    });

    if (!req.timeframe.end_date)
      req.timeframe.end_date = req.timeframe.start_date;

    return req;
  };

  const newReq = await validate({
    name: 'REQ849201',
    description: description,
    status: 'pending',
    timeframe: timeframe,
    // visitors: visitors,
    visitors: [],
    activity: [],
  });

  try {
    console.log(newReq.visitors);
    const col = await getCol('requests');
    col.insertOne(newReq);
    res.send(`${newReq.name} successfully created.`);
  } catch (error) {
    console.log(error);
  }
}); // newRequest

router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const col = await getCol('requests');
    const request = await col.findOne({ _id: ObjectId(id) });
    res.send(request);
  } catch (error) {
    console.log(error);
  }
}); // getRequestById

router.get('/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const col = await getCol('requests');
    const requests = await col.find({ status: status }).toArray();
    res.send(requests);
  } catch (error) {
    console.log(error);
  }
}); // getRequestsByStatus

// getRequestsByCompany

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  try {
    const col = await getCol('requests');
    await col.updateOne({ _id: ObjectId(id) }, { $set: value });
    res.send(`Request has been updated.`);
  } catch (error) {
    console.log(error);
  }
});

router.patch('/req-reset', async (req, res) => {
  const reqs = [
    {
      name: 'REQ12331',
      description: 'Random access request',
      status: 'active',
      timeframe: {
        start_time: '08:00',
        end_time: '16:00',
        start_date: '12/31/22',
        end_date: '12/31/22',
      },
      activity: [
        {
          type: 'request_open',
          time: '11/23/22 15:37:00',
          message:
            'Michael leCour submitted REQ12331 for "Random access request" during 12/31/22 08:00 - 16:00.',
        },
        {
          type: 'request_approve',
          time: '11/23/22 16:20:00',
          message:
            'Tyler Blease approved REQ12331 for "Random access request" during 12/31/22 08:00 - 16:00.',
        },
        {
          type: 'check_in',
          time: '12/31/22 12:32:00',
          message: 'Michael leCour checked in for REQ12331.',
        },
      ],
      visitors: [
        {
          user_id: '6371a36a05312edf2982dc64',
          user_name: 'Michael leCour',
          company_name: 'Dell Corporations',
          is_onsite: true,
          badges: [1, 11],
        },
      ],
    },
    {
      name: 'REQ12339',
      description: 'An Active random access request',
      status: 'active',
      timeframe: {
        start_time: '08:00',
        end_time: '16:00',
        start_date: '12/31/22',
        end_date: '12/31/22',
      },
      activity: [
        {
          type: 'request_open',
          time: '11/23/22 15:37:00',
          message:
            'John Doe submitted REQ12339 for "An Active random access request" during 12/31/22 08:00 - 16:00.',
        },
        {
          type: 'request_approve',
          time: '11/23/22 16:20:00',
          message:
            'Tyler Blease approved REQ12339 for "An Active random access request" during 12/31/22 08:00 - 16:00.',
        },
        {
          type: 'check_in',
          time: '12/31/22 12:32:00',
          message: 'John Doe checked in for REQ12339.',
        },
        {
          type: 'check_in',
          time: '12/31/22 12:32:00',
          message: 'Mary Jane checked in for REQ12339.',
        },
      ],
      visitors: [
        {
          user_id: '63705da5be5ebe86635561e1',
          user_name: 'John Doe',
          company_name: 'Guest',
          is_onsite: true,
          badges: [],
        },
        {
          user_id: '63705db4be5ebe86635561e2',
          user_name: 'Mary Jane',
          company_name: 'Guest',
          is_onsite: true,
          badges: [],
        },
      ],
    },
    {
      name: 'REQ12332',
      description: 'Another random raccess request',
      status: 'pending',
      timeframe: {
        start_time: '08:00',
        end_time: '16:00',
        start_date: '12/31/22',
        end_date: '12/31/22',
      },
      activity: [
        {
          type: 'request_open',
          time: '11/23/22 15:37:00',
          message:
            'Michael leCour submitted REQ12332 for "Another random access request" during 12/31/22 08:00 - 16:00.',
        },
      ],
      visitors: [
        {
          user_id: '6371a36a05312edf2982dc64',
          user_name: 'Michael leCour',
          company_name: 'Dell Corporations',
          is_onsite: false,
          badges: [],
        },
      ],
    },
    {
      name: 'REQ12333',
      description: "Another random raccess request that's pending",
      status: 'pending',
      timeframe: {
        start_time: '08:00',
        end_time: '16:00',
        start_date: '12/31/22',
        end_date: '12/31/22',
      },
      activity: [
        {
          type: 'request_open',
          time: '11/23/22 15:37:00',
          message:
            'Michael leCour submitted REQ12333 for "Another random raccess request that\'s pending" during 12/31/22 08:00 - 16:00.',
        },
      ],
      visitors: [
        {
          user_id: '6371a36a05312edf2982dc64',
          user_name: 'Michael leCour',
          company_name: 'Dell Corporations',
          is_onsite: false,
          badges: [],
        },
      ],
    },
    {
      name: 'REQ12334',
      description: 'Completed access request',
      status: 'closed',
      timeframe: {
        start_time: '08:00',
        end_time: '16:00',
        start_date: '12/31/22',
        end_date: '12/31/22',
      },
      activity: [
        {
          type: 'request_open',
          time: '11/23/22 15:37:00',
          message:
            'Michael leCour submitted REQ12334 for "Completed access request" during 12/31/22 08:00 - 16:00.',
        },
        {
          type: 'request_approve',
          time: '11/23/22 16:20:00',
          message:
            'Tyler Blease approved REQ12334 for "Random access request" during 12/31/22 08:00 - 16:00.',
        },
        {
          type: 'check_in',
          time: '12/31/22 12:32:00',
          message: 'Michael leCour checked in for REQ12334.',
        },
        {
          type: 'check_out',
          time: '12/31/22 14:12:00',
          message: 'Michael leCour checked out for REQ12334.',
        },
        {
          type: 'request_close',
          time: '12/23/22 16:30:00',
          message: 'REQ12334 closed after exceeding request window.',
        },
      ],
      visitors: [
        {
          user_id: '6371a36a05312edf2982dc64',
          user_name: 'Michael leCour',
          company_name: 'Dell Corporations',
          is_onsite: false,
          badges: [],
        },
      ],
    },
  ];
  try {
    const col = await getCol('requests');
    await col.deleteMany({ name: 'REQ849201' });
    // await col.deleteMany({})
    // await col.insertMany([...reqs]);
    res.send('Requests reset');
  } catch (error) {
    console.log(error);
  }
}); // reset requests to default

export default router;

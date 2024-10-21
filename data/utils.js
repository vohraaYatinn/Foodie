import { images } from "../constants"

export const offers = [
    {
      id: 1,
      name: "Delivery"
    },
    {
      id: 2,
      name: "Pick Up"
    },
    {
      id: 3,
      name: "Offer"
    },
    {
      id: 4,
      name: "Online payment available"
    }
  ]

export const cartData = [
    {
        id: 1,
        name: "Pizza calzone european",
        // image: images.food,
        image: images.burger3,
        price: 64,
        size: "14",
        quantity: 1,
    },
    {
        id: 2,
        name: "Burger calzone european",
        // image: images.food,
        image: images.pizza2,
        price: 47,
        size: "14",
        quantity: 1,
    },
    {
        id: 3,
        name: "Asian calzone european",
        // image: images.food,
        image: images.burger4,
        price: 32,
        size: "14",
        quantity: 1,
    }
]

export const orderList = [
  {
      latitude: 48.8566,
      longitude: 2.3522,
      name: 'Order 1',
      description: 'Order description 2',
  },
  {
      latitude: 43.2965,
      longitude: 5.3698,
      name: 'Order 2',
      description: 'Order description 2',
  },
  {
      latitude: 45.764,
      longitude: 4.8357,
      name: 'Order 3',
      description: 'Order description 3',
  },
  {
      latitude: 43.6045,
      longitude: 1.4442,
      name: 'Order 4',
      description: 'Order description 4',
  },
  {
      latitude: 43.7102,
      longitude: 7.2661,
      name: 'Order 5',
      description: 'Order description 5',
  },
];

export const orders = [
  {
    id: 1,
    type: 'Food',
    name: "Pizza Hut",
    // image: images.food,
    image: images.burger3,
    price: 35.25,
    numberOfItems: 3,
    receipt: "#162432",
  },
  {
    id: 2,
    type: 'Drink',
    name: "McDonald",
    // image: images.food,
    image: images.pizza2,
    price: 40.15,
    numberOfItems: 2,
    receipt: "#162422",
  },
  {
    id: 3,
    type: 'Drink',
    name: "Starbucks",
    // image: images.food,
    image: images.pizza6,
    price: 35,
    numberOfItems: 1,
    receipt: "#232432",
  },
]

export const history = [
  {
    id: 1,
    status: "Completed",
    date: "29 Jan, 12:30",
    type: 'Food',
    name: "Pizza Hut",
    // image: images.food,
    image: images.burger4,
    price: 35.25,
    numberOfItems: 3,
    receipt: "#162432",
  },
  {
    id: 2,
    status: "Completed",
    date: "30 Jan, 12:30",
    type: 'Drink',
    name: "McDonald",
    // image: images.food,
    image: images.burger4,
    price: 40.15,
    numberOfItems: 2,
    receipt: "#162422",
  },
  {
    id: 3,
    status: "Canceled",
    date: "30 Jan, 12:30",
    type: 'Drink',
    name: "Starbucks",
    // image: images.food,
    image: images.pizza4,
    price: 35,
    numberOfItems: 1,
    receipt: "#232432",
  },
]

export const notifications = [
   
]

export const messages = [
    {
        id: 1,
        image: images.avatar,
        name: 'Royal Parvej',
        lastMessage: 'Sounds awesome!',
        pendingMessage: 1,
        time: '19:37',
        isOnline: true
    },
    {
        id: 2,
        image: images.avatar2,
        name: 'Cameron Williamson',
        lastMessage: 'Ok, Just hurry up...😊',
        pendingMessage: 1,
        time: '19:37',
        isOnline: true
    },
    {
        id: 3,
        image: images.avatar3,
        name: 'Ralph Edwards',
        lastMessage: 'Thanks dude',
        pendingMessage: 0,
        time: '19:37',
        isOnline: false
    },
    {
        id: 4,
        image: images.avatar4,
        name: 'Cody Fisher',
        lastMessage: 'How is going...',
        pendingMessage: 0,
        time: '19:37',
        isOnline: true
    },
    {
        id: 5,
        image: images.avatar5,
        name: 'Eleanor Pena',
        lastMessage: 'Thanks for the awesome...',
        pendingMessage: 0,
        time: '19:37',
        isOnline: true
    },
]

export const reviews = [
    {
        id: 1,
        image: images.avatar,
        title: 'Great Food and Service',
        description: 'This Food so tasty & delicious. Breakfast so fast Delivered in my place. Chef is very friendly. I m really like chef for Home Food  Order. Thanks. ',
        date: '20/12/2023',
        num: 5
    },
    {
        id: 2,
        image: images.avatar2,
        title: 'Awesome and Nice',
        description: 'This Food so tasty & delicious. Breakfast so fast Delivered in my place. ',
        date: '23/09/25',
        num: 4
    },
    {
        id: 3,
        image: images.avatar3,
        title: 'Awesome and Nice',
        description: 'This Food so tasty & delicious.',
        date: '20/12/2024',
        num: 5
    },
    {
        id: 4,
        image: images.avatar3,
        title: 'Awesome and Nice',
        description: 'This Food so tasty & delicious. Breakfast so fast Delivered in my place. ',
        date: '20/12/2024',
        num: 5
    }
]

export const messsagesData = [
  {
      id: "1",
      fullName: "Jhon Smith",
      isOnline: false,
      userImg: images.avatar1,
      lastSeen: "2023-11-16T04:52:06.501Z",
      lastMessage: 'I love you. see you soon baby',
      messageInQueue: 2,
      lastMessageTime: "12:25 PM",
      isOnline: true,
  },
  {
      id: "2",
      fullName: "Anuska Sharma",
      isOnline: false,
      userImg: images.avatar2,
      lastSeen: "2023-11-18T04:52:06.501Z",
      lastMessage: 'I Know. you are so busy man.',
      messageInQueue: 0,
      lastMessageTime: "12:15 PM",
      isOnline: false
  },
  {
      id: "3",
      fullName: "Virat Kohili",
      isOnline: false,
      userImg: images.avatar3,
      lastSeen: "2023-11-20T04:52:06.501Z",
      lastMessage: 'Ok, see u soon',
      messageInQueue: 0,
      lastMessageTime: "09:12 PM",
      isOnline: true
  },
  {
      id: "4",
      fullName: "Shikhor Dhaon",
      isOnline: false,
      userImg: images.avatar4,
      lastSeen: "2023-11-18T04:52:06.501Z",
      lastMessage: 'Great! Do you Love it.',
      messageInQueue: 0,
      lastMessageTime: "04:12 PM",
      isOnline: true
  },
  {
      id: "5",
      fullName: "Shakib Hasan",
      isOnline: false,
      userImg: images.avatar5,
      lastSeen: "2023-11-21T04:52:06.501Z",
      lastMessage: 'Thank you !',
      messageInQueue: 2,
      lastMessageTime: "10:30 AM",
      isOnline: true
  },
  {
      id: "6",
      fullName: "Jacksoon",
      isOnline: false,
      userImg: images.avatar6,
      lastSeen: "2023-11-20T04:52:06.501Z",
      lastMessage: 'Do you want to go out dinner',
      messageInQueue: 3,
      lastMessageTime: "10:05 PM",
      isOnline: false
  },
  {
      id: "7",
      fullName: "Tom Jerry",
      isOnline: false,
      userImg: images.avatar7,
      lastSeen: "2023-11-20T04:52:06.501Z",
      lastMessage: 'Do you want to go out dinner',
      messageInQueue: 2,
      lastMessageTime: "11:05 PM",
      isOnline: true
  },
  {
      id: "8",
      fullName: "Lucky Luck",
      isOnline: false,
      userImg: images.avatar8,
      lastSeen: "2023-11-20T04:52:06.501Z",
      lastMessage: 'Can you share the design with me?',
      messageInQueue: 2,
      lastMessageTime: "09:11 PM",
      isOnline: true
  },
  {
      id: "9",
      fullName: "Nate Jack",
      isOnline: false,
      userImg: images.avatar9,
      lastSeen: "2023-11-20T04:52:06.501Z",
      lastMessage: 'Tell me what you want?',
      messageInQueue: 0,
      lastMessageTime: "06:43 PM",
      isOnline: true
  }
]
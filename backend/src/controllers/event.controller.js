const Event = require('../models/Event');
const { isDBConnected } = require('../config/db');

// In-memory fallback events
const inMemoryEvents = [
  {
    _id: 'evt_1',
    title: 'Parivaar Parivartan Shaala: Session 1 - Loving Routines & Emotional Regulation',
    category: 'Parivaar Parivartan Shaala (10-Week Workshop)',
    description: 'Empowering parents with non-punitive boundary setting and predictable emotional rhythms for 3-7 year olds.',
    location: 'MCD Primary School, Chirag Dilli, New Delhi',
    dateTime: new Date('2026-04-12T10:00:00Z'),
    durationHours: 2.5,
    capacity: 60,
    registeredCount: 42,
    status: 'upcoming',
    facilitator: 'Dawn Child Foundation ECCE Mentors',
  },
  {
    _id: 'evt_2',
    title: 'Screen-Free Childhoods: Community Dialogue & Device Delay Strategy',
    category: 'Digital Screen Time Awareness',
    description: 'An interactive seminar for parents and teachers on implementing the "Not Yet" Parent Pledge and fostering outdoor free play.',
    location: 'Community Hall, Hauz Rani, Malviya Nagar, New Delhi',
    dateTime: new Date('2026-04-26T15:30:00Z'),
    durationHours: 2,
    capacity: 80,
    registeredCount: 65,
    status: 'upcoming',
    facilitator: 'Child Psychology Lead & Community Facilitators',
  },
];

// @desc    Get all events
// @route   GET /api/event
// @access  Public
exports.getAllEvents = async (req, res) => {
  try {
    if (isDBConnected()) {
      const events = await Event.find().sort({ dateTime: 1 });
      return res.json({
        success: true,
        count: events.length,
        events,
      });
    }

    return res.json({
      success: true,
      count: inMemoryEvents.length,
      events: inMemoryEvents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching events',
    });
  }
};

// @desc    Get single event by ID
// @route   GET /api/event/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      return res.json({ success: true, event });
    }

    const event = inMemoryEvents.find((e) => e._id === id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    return res.json({ success: true, event });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching event details',
    });
  }
};

// @desc    Register attendee for an event
// @route   POST /api/event/:id/register
// @access  Public
exports.registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { parentName, phone, attendeeCount } = req.body;

    if (!parentName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and contact number are required to reserve seats',
      });
    }

    const count = Number(attendeeCount) || 1;

    if (isDBConnected()) {
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      if (event.registeredCount + count > event.capacity) {
        return res.status(400).json({ success: false, message: 'Sorry, this session is fully booked!' });
      }

      event.registeredCount += count;
      await event.save();

      return res.json({
        success: true,
        message: 'Seats reserved successfully! We look forward to welcoming you.',
        event,
      });
    }

    const event = inMemoryEvents.find((e) => e._id === id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    event.registeredCount += count;
    return res.json({
      success: true,
      message: 'Seats reserved successfully (in-memory mode)!',
      event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error registering for event',
    });
  }
};

// @desc    Create new event (Admin)
// @route   POST /api/event
// @access  Private/Admin
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, location, dateTime, capacity, facilitator } = req.body;

    if (!title || !description || !dateTime) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and date/time are required',
      });
    }

    if (isDBConnected()) {
      const event = await Event.create({
        title,
        description,
        category: category || 'Parivaar Parivartan Shaala (10-Week Workshop)',
        location: location || 'MCD Primary School, Chirag Dilli',
        dateTime: new Date(dateTime),
        capacity: Number(capacity) || 60,
        facilitator: facilitator || 'Dawn Child Foundation ECCE Mentors',
      });
      return res.status(201).json({ success: true, event });
    }

    const newEvent = {
      _id: `evt_${Date.now()}`,
      title,
      description,
      category: category || 'Parivaar Parivartan Shaala (10-Week Workshop)',
      location: location || 'MCD Primary School, Chirag Dilli',
      dateTime: new Date(dateTime),
      capacity: Number(capacity) || 60,
      registeredCount: 0,
      status: 'upcoming',
      facilitator: facilitator || 'Dawn Child Foundation ECCE Mentors',
    };
    inMemoryEvents.push(newEvent);

    return res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating event',
    });
  }
};

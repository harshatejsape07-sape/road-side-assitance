import { User } from '@/models/User';
import { Vehicle } from '@/models/Vehicle';
import { AssistanceRequest } from '@/models/AssistanceRequest';
import { connectDatabase, disconnectDatabase } from '@/config';
import Logger from '@/config/logger';

const logger = Logger.getLogger('Seed');

const seedDatabase = async () => {
  try {
    logger.info('Starting database seed...');

    await connectDatabase();

    // Clear existing data
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await AssistanceRequest.deleteMany({});

    logger.info('Cleared existing data');

    // Seed users
    const customers = await User.create([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'customer1@example.com',
        phone: '+1-555-0101',
        password: 'Password@123',
        role: 'customer',
        isEmailVerified: true,
        isPhoneVerified: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'customer2@example.com',
        phone: '+1-555-0102',
        password: 'Password@123',
        role: 'customer',
        isEmailVerified: true,
        isPhoneVerified: true,
      },
    ]);

    const mechanics = await User.create([
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mechanic1@example.com',
        phone: '+1-555-0201',
        password: 'Password@123',
        role: 'mechanic',
        isEmailVerified: true,
        isPhoneVerified: true,
        verificationStatus: 'approved',
      },
      {
        firstName: 'Robert',
        lastName: 'Williams',
        email: 'mechanic2@example.com',
        phone: '+1-555-0202',
        password: 'Password@123',
        role: 'mechanic',
        isEmailVerified: true,
        isPhoneVerified: true,
        verificationStatus: 'approved',
      },
    ]);

    logger.info(`✓ Created ${customers.length} customer accounts`);
    logger.info(`✓ Created ${mechanics.length} mechanic accounts`);

    // Seed vehicles
    const vehicles = await Vehicle.create([
      {
        userId: customers[0]._id,
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        licensePlate: 'ABC1234',
        registrationNumber: 'REG001',
        color: 'Silver',
        fuelType: 'petrol',
      },
      {
        userId: customers[1]._id,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        licensePlate: 'XYZ5678',
        registrationNumber: 'REG002',
        color: 'Blue',
        fuelType: 'diesel',
      },
    ]);

    logger.info(`✓ Created ${vehicles.length} vehicles`);

    // Seed assistance requests
    const requests = await AssistanceRequest.create([
      {
        customerId: customers[0]._id,
        vehicleId: vehicles[0]._id,
        issueCategory: 'flat_tyre',
        description: 'Front left tire is completely flat',
        status: 'completed',
        location: {
          type: 'Point',
          coordinates: [-74.0060, 40.7128], // New York
          address: '123 Main St, New York, NY 10001',
        },
        assignedMechanicId: mechanics[0]._id,
        estimatedArrivalTime: 25,
      },
      {
        customerId: customers[1]._id,
        vehicleId: vehicles[1]._id,
        issueCategory: 'battery_failure',
        description: 'Battery is dead, car won\'t start',
        status: 'pending',
        location: {
          type: 'Point',
          coordinates: [-87.6298, 41.8781], // Chicago
          address: '456 Oak Ave, Chicago, IL 60601',
        },
        estimatedArrivalTime: 35,
      },
    ]);

    logger.info(`✓ Created ${requests.length} assistance requests`);

    logger.info('✓ Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Database seed failed:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
};

seedDatabase();

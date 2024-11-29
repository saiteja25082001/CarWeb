import UserInvoice from '../../components/UserInvoice';
import UserModel from '@/app/utils/models/User';
import { auth } from '@/auth';
import DBConnection from '../utils/config/db';

const InvoicePage = async () => {
  // Fetch session data
  const session = await auth();
  await DBConnection();
  
  if (!session || !session.email) {
    return <div>User not authenticated</div>;
  }

  const email = session.email;
  
  // Fetch user data from the database based on email
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return <div>User not found</div>;
  }

  const userId = user?._id.toString();
  const bookingCount = user?.bookings.length || 0;

  return (
    <div>
      {/* You can pass the userId as a prop to UserInvoice */}
      <UserInvoice userId={userId} />
    </div>
  );
};

export default InvoicePage;

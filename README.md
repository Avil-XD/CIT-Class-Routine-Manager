# CIT Class Routine Manager

A modern web application for managing class routines at Central Institute of Technology (CIT), Kokrajhar.

## Features

- Interactive class routine management
- Support for all departments (CSE, ECE, CE, IE, IT)
- Automatic conflict detection for:
  - Room allocations
  - Teacher schedules
- Real-time availability checking
- PDF export functionality
- Shared resource management across departments

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Local Storage for data persistence

## Usage

### For Development

```bash
git clone https://github.com/yourusername/CIT-Class-Routine-Manager.git
cd CIT-Class-Routine-Manager
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### For Production

```bash
npm run build
npm start
```

## Key Features

1. **Department Management**
   - CSE, ECE, CE, IE, IT departments supported
   - Semester-wise subject allocation
   - Shared resource management

2. **Time Slot Management**
   - 8 slots per day (8:30 AM to 5:30 PM)
   - Lunch break handling
   - Clear slot visualization

3. **Resource Management**
   - Room availability tracking
   - Teacher schedule management
   - Cross-department conflict prevention

4. **User Interface**
   - Intuitive drag-and-drop interface
   - Real-time conflict detection
   - Clear availability indicators

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

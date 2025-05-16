#### This is a repository for San Jose State University Spring 2025 Senior Projet Group U12

# InSight: Alternative Biometric Payment Integration in Public Transport Systems (Kiosk)

## Link to the [Kiosk](https://github.com/InSight-Transit/InSight-WebApp)
## Link to the [on board camera](https://github.com/InSight-Transit/InSight-Onboard-Camera)
## Link to the [API](https://github.com/InSight-Transit/InSight-API)




#### ABSTRACT

Facial Recognition as a Biometric Payment Method on Public Transit


Public transportation is necessary for many Americans who work minimum-wage jobs and students nationwide. According to the American Public Transportation Association, people in the US took 9.9 billion trips on public transportation. It is also a 79 billion-dollar industry that employs more than 430,000 people. In addition to this, every dollar spent generates 5 dollars in economic returns (APTA, 2023). 
  
However, current methods for paying fares when boarding public transportation waste a large amount of time and money. According to a report by the National Association of City Transport Officials, paying for a bus fare while boarding could take up to 9 seconds per passenger. When accounting for all buses in the US, this means bus drivers “spend at least six million hours at bus stops each year, directly costing agencies an estimated $700 million” (NACTO, 2017). 
 
There is a lot of room for improvement to address this through automation which would reduce waiting times and increase customer comfort as a bonus. This project aims to reduce boarding times on public transit routes by the use of a facial recognition payment device. This device scans passengers’ faces registered with the system and automatically charges them their fare as they board the vehicle. This is paired with a kiosk where passengers would register an account, their face, and their preferred payment method. The outcome would decrease boarding times to the duration of time it takes for passengers to walk into the vehicle.

##### Goals:
- The use of facial recognition will result in quicker, easier, and more accessible payments for transportation.
- Reduce congestion and delays at ticket gates by offering fast, contactless entry to passengers, especially during peak hours.
- Reduce unauthorized access and fare evasion.
- Reduce physical contact with public surfaces, something very critical in transportation systems in the post-pandemic era.

##### Objective:
- Provide a secure, reliable, and scalable facial recognition system that can identify registered users, and can also easily integrate into existing transportation payment systems.
- Must deliver highly accurate performance in different environmental conditions regarding lighting and angles.
- The system should be built to legislation such as the General Data Protection Regulation.
Ensure usability across different transport modes, such as subway, buses, and trains.


## Demo:

First clone the repository to the server.

Then, run
```bash
npm i
```
to install dependencies.


Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


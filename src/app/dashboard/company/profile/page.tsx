export default function CompanyDetails() {
    // Placeholder data (Replace with API data later)
    const company = {
      softwareUrl: "https://sabharwal-micro.hubco.in",
      website: "www.sabharwalfinance.in",
      companyName: "SABHARWAL FINANCE AND ESTATES PRIVATE LTD",
      shortName: "SABHARWAL",
      about: "SABHARWAL FINANCE AND ESTATES PRIVATE LIMITED",
      CIN: "UP65910UP1997PTC195710",
      PAN: "AAKCS2292K",
      TAN: "-",
      GSTNo: "09AAKCS229K1ZT",
      category: "Limited by shares",
      class: "Public Limited Company",
      authorizedCapital: "50,000,000.00",
      paidUpCapital: "50,000,000.00",
      shareNominalValue: "10.00",
      stateRegistration: "Uttar Pradesh, India",
      incorporationDate: "1 June 2014",
      address:
        "201, 1st floor 645B/397 P3, Vashishth, 60 Feet Road Jankipuram LUCKNOW Uttar Pradesh - 226021",
      email: "info@sabharwalfinance.in",
      phone: "7275229900",
      landlineNo: "-",
    };
  
    return (
      
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-6 space-y-4">
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{company.companyName}</h2>
            <p className="text-gray-600">{company.about}</p>
          </div>
  
          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Short Name" value={company.shortName} />
            <DetailItem label="CIN" value={company.CIN} />
            <DetailItem label="PAN" value={company.PAN} />
            <DetailItem label="TAN" value={company.TAN} />
            <DetailItem label="GST No" value={company.GSTNo} />
            <DetailItem label="Category" value={company.category} />
            <DetailItem label="Class" value={company.class} />
            <DetailItem label="Authorized Capital" value={`₹${company.authorizedCapital}`} />
            <DetailItem label="Paid Up Capital" value={`₹${company.paidUpCapital}`} />
            <DetailItem label="Share Nominal Value" value={`₹${company.shareNominalValue}`} />
            <DetailItem label="State of Registration" value={company.stateRegistration} />
            <DetailItem label="Incorporation Date" value={company.incorporationDate} />
            <DetailItem label="Address" value={company.address} />
            <DetailItem label="Email" value={company.email} />
            <DetailItem label="Phone" value={company.phone} />
            <DetailItem label="Landline No." value={company.landlineNo} />
          </div>
  
          {/* Website and Software URL */}
          <div className="text-center mt-4">
            <a
              href={company.softwareUrl}
              target="_blank"
              className="text-blue-600 hover:underline font-medium"
            >
              Software URL
            </a>{" "}
            |{" "}
            <a
              href={`https://${company.website}`}
              target="_blank"
              className="text-blue-600 hover:underline font-medium"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  // Reusable Component for Detail Items
  const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-gray-50 p-3 rounded-md shadow-sm">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-800 font-semibold">{value || "-"}</p>
    </div>
  );
  
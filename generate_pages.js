const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'Wishlist', icon: '💖', title: 'My Wishlist', desc: 'Your saved items will appear here.' },
  { name: 'ManageCustomers', icon: '👤', title: 'Manage Customers', desc: 'View and manage registered customers.' },
  { name: 'PaymentsRefunds', icon: '💳', title: 'Payments & Refunds', desc: 'Manage payment transactions and process refunds.' },
  { name: 'AbandonedCarts', icon: '🛒', title: 'Abandoned Carts', desc: 'Track and recover abandoned shopping carts.' },
  { name: 'ShippingTracking', icon: '🚚', title: 'Shipping Tracking', desc: 'Monitor active shipments and delivery status.' },
  { name: 'ReviewModeration', icon: '⭐', title: 'Review Moderation', desc: 'Approve or reject customer product reviews.' },
  { name: 'ManageCoupons', icon: '🎟️', title: 'Manage Coupons', desc: 'Create and manage discount codes.' },
];

pages.forEach(p => {
  const content = "import React from 'react';\n\n" +
"const " + p.name + " = () => {\n" +
"  return (\n" +
"    <div className=\"page-container\">\n" +
"      <div className=\"page-header\">\n" +
"        <h1>" + p.icon + " " + p.title + "</h1>\n" +
"        <button className=\"btn btn-primary\">+ Add New</button>\n" +
"      </div>\n" +
"      \n" +
"      <div className=\"card\" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>\n" +
"        <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>" + p.icon + "</div>\n" +
"        <h2 style={{ marginBottom: '1rem' }}>Coming Soon</h2>\n" +
"        <p style={{ color: 'var(--text-secondary)' }}>" + p.desc + "</p>\n" +
"        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>\n" +
"          This module is currently under development and will be available in the next major update.\n" +
"        </p>\n" +
"      </div>\n" +
"    </div>\n" +
"  );\n" +
"};\n\n" +
"export default " + p.name + ";\n";
  
  fs.writeFileSync(path.join(__dirname, 'frontend/src/pages', p.name + '.jsx'), content);
});

console.log('Pages generated successfully!');

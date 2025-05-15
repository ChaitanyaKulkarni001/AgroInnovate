import React, { useState } from "react";

const SavedCards = () => {
  const [cards, setCards] = useState([
    { id: 1, cardType: "Visa", cardNumber: "**** **** **** 1234", holder: "Ravi Kumar" },
    { id: 2, cardType: "MasterCard", cardNumber: "**** **** **** 5678", holder: "Sunita Devi" },
  ]);

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleAddCard = () => {
    const cardNumber = prompt("Enter last 4 digits of Card Number:");
    const cardType = prompt("Enter Card Type (Visa, MasterCard, etc):");
    const holder = prompt("Enter Card Holder Name:");

    if (cardNumber && cardType && holder) {
      setCards([
        ...cards,
        {
          id: Date.now(),
          cardType: cardType,
          cardNumber: `**** **** **** ${cardNumber}`,
          holder: holder,
        },
      ]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Saved Cards</h1>

      {cards.length === 0 ? (
        <p className="text-gray-600">No cards saved yet.</p>
      ) : (
        cards.map((card) => (
          <div
            key={card.id}
            className="flex justify-between items-center bg-white border p-4 rounded-lg mb-3 shadow-sm"
          >
            <div>
              <p className="text-lg font-medium text-gray-800">{card.cardType}</p>
              <p className="text-gray-600">{card.cardNumber}</p>
              <p className="text-gray-500 text-sm">Holder: {card.holder}</p>
            </div>
            <button
              onClick={() => handleDeleteCard(card.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))
      )}

      <button
        onClick={handleAddCard}
        className="mt-5 bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        + Add New Card
      </button>
    </div>
  );
};

export default SavedCards;

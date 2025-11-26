import React from 'react'

const Map = () => {
  return (
    <div className="w-full  rounded-2xl  shadow-lg border border-gray-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5271.301992547227!2d105.83993498490904!3d20.897292358948015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b267007b1981%3A0x85d6f0a2ce82b18c!2zTmjDoCBUaOG7nSBOZ3V54buFbiBUcsOjaQ!5e0!3m2!1svi!2s!4v1764083715736!5m2!1svi!2s"
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        className="w-full"
      ></iframe>
    </div>
  );
}

export default Map
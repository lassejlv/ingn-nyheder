"use client";

export default function Footer() {


  return (
    <footer className="border-t-2 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Adresse:</h3>
          <p>Intet nyt - Godt nyt ApS</p>
          <p>Tulipanvej 232</p>
          <p>7320</p>
          <p>Valby Øster</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Links</h3>
          <ul>
            <li><a href="https://vikanweb.dk" className="hover:underline">vikanweb.dk</a></li>
            <li><a href="https://overpådenandenside.dk" className="hover:underline">overpådenandenside.dk</a></li>
            <li><a href="https://retsinformation.dk" className="hover:underline">retsinformation.dk</a></li>
            <li><a href="https://nogetmednews.dk" className="hover:underline">nogetmednews.dk</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Politik</h3>
          <ul>
            <li>Privatlivspolitik</li>
            <li>Cookiepolitik</li>
            <li>Købsinformation</li>
            <li>Delingspolitik</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Kontakt</h3>
          <p>ingn@nyhed.dk</p>
          <p>telefon: 23232323</p>
          <p>fax: 123123-333</p>
        </div>
      </div>
    </footer>
  )
}

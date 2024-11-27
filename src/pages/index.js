"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import image from "../../public/logo.png";

export default function Home() {

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `, styleSheet.cssRules.length);

    const cards = document.querySelectorAll('[data-card]');
    cards.forEach(card => {
      card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      });
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseover', () => {
          card.style.transform = 'scale(1.05)';
          card.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        });
        card.removeEventListener('mouseout', () => {
          card.style.transform = 'scale(1)';
          card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
      });
    };
  }, []);

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <Image
          src={image}
          alt="Logo"
          width={160}
          height={110}
          priority
          style={styles.logo}
        />
        <h1 style={styles.title}>Welcome To LinkHub</h1>
        <p style={styles.subtitle}>Connect, Share, Thrive</p>
        <div style={styles.cardContainer}>
          <div style={styles.card} data-card>
            <h2 style={styles.cardTitle}>Connect</h2>
            <p style={styles.cardDescription}>Share your thoughts, stories and experiences</p>
          </div>
          <div style={styles.card} data-card>
            <h2 style={styles.cardTitle}>Share</h2>
            <p style={styles.cardDescription}>Proudly share success stories</p>
          </div>
          <div style={styles.card} data-card>
            <h2 style={styles.cardTitle}>Thrive</h2>
            <p style={styles.cardDescription}>Empower, Grow, Succeed, Thrive Together</p>
          </div>
          <Link href="/signup">
            <p style={styles.linkText}>
              Start Your Journey Now...
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
    backgroundImage: 'url(https://t3.ftcdn.net/jpg/06/06/59/32/360_F_606593218_xx4pzBfrDqFEYVXJ6u9a9cGG6dpqYNXB.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    textAlign: 'center',
    maxWidth: '800px',
    padding: '25px 20px 40px 20px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    animation: 'fadeIn 1s ease-in-out',
    filter: "blur(0.3px)"
  },
  logo: {
    borderRadius: '20px',
  },
  title: {
    color: '#333',
    marginBottom: '0.5em',
    fontSize: '2.5em',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.5em',
    color: '#666',
    marginBottom: '2em',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1',
    minWidth: '200px',
    margin: '10px',
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: '#e8f0fe',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.7em',
    color: '#333',
    marginBottom: '0.5em',
  },
  cardDescription: {
    fontSize: '1em',
    color: '#666',
  },
  linkText: {
    color: 'black',
    marginTop: '30px',
    fontSize: '25px',
    fontFamily: 'monospace',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    animation: 'fadeIn 1s ease-in-out, pulse 2s infinite',
    textDecoration: 'none',
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '5px',
  },
};

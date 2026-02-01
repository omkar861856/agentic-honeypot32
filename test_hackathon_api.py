import requests
import json

BASE_URL = "http://localhost:3000/api/honeypot"
API_KEY = "secret-hackathon-key-2026"

def test_initial_message():
    payload = {
        "sessionId": "test-session-001",
        "message": {
            "sender": "scammer",
            "text": "Your bank account will be blocked today. Verify immediately at http://scam-link.com",
            "timestamp": "2026-02-01T10:15:30Z"
        },
        "conversationHistory": [],
        "metadata": {
            "channel": "SMS",
            "language": "English",
            "locale": "IN"
        }
    }
    
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    
    response = requests.post(BASE_URL, json=payload, headers=headers)
    print("Initial Message Response:")
    print(json.dumps(response.json(), indent=2))
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert "reply" in response.json()

def test_follow_up():
    payload = {
        "sessionId": "test-session-001",
        "message": {
            "sender": "scammer",
            "text": "Share your UPI ID to avoid account suspension.",
            "timestamp": "2026-02-01T10:17:10Z"
        },
        "conversationHistory": [
            {
                "sender": "scammer",
                "text": "Your bank account will be blocked today. Verify immediately at http://scam-link.com",
                "timestamp": "2026-02-01T10:15:30Z"
            }
        ],
        "metadata": {
            "channel": "SMS",
            "language": "English",
            "locale": "IN"
        }
    }
    
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    
    response = requests.post(BASE_URL, json=payload, headers=headers)
    print("\nFollow-up Message Response:")
    print(json.dumps(response.json(), indent=2))
    assert response.status_code == 200
    assert response.json()["status"] == "success"

if __name__ == "__main__":
    try:
        test_initial_message()
        test_follow_up()
        print("\nAll tests passed!")
    except Exception as e:
        print(f"\nTest failed: {e}")

import psutil
import requests
 
def get_private_ip():
    """Return your actual Wi-Fi/LAN IPv4 address (matches ipconfig)."""
    for interface, addrs in psutil.net_if_addrs().items():
        for addr in addrs:
            if addr.family.name == "AF_INET" and not addr.address.startswith(("127.", "169.254")):
                # Exclude localhost and link-local
                return addr.address
    return "Unknown"
 
 
def get_public_ip():
    """Return your public IP as seen from the internet."""
    try:
        return requests.get("https://api.ipify.org?format=text", timeout=30).text.strip()
    except Exception:
        return None
 
 
def check_vpn_status():
    private_ip = get_private_ip()
    public_ip = get_public_ip()
 
    print(f"💻 Private (Local) IP : {private_ip}")
    print(f"🌐 Public (Internet) IP: {public_ip}")
 
    if not public_ip:
        print("⚠️ Could not fetch public IP (check internet connection).")
        return
 
    try:
        # Fetch ISP and location info
        resp = requests.get(f"https://ipapi.co/{public_ip}/json/", timeout=5)
        data = resp.json()
        isp = data.get("org", "Unknown")
        country = data.get("country_name", "Unknown")
 
        print(f"🏢 ISP / Org:   {isp}")
        print(f"📍 Country:     {country}\n")
 
        # Known VPN/Hosting keywords
        vpn_indicators = [
            "vpn", "hosting", "cloud", "data center", "datacenter", "server",
            "amazon", "aws", "azure", "google", "digitalocean", "ovh",
            "linode", "contabo", "hetzner", "choopa", "leaseweb",
            "m247", "datacamp", "proton", "nord", "expressvpn",
            "surfshark", "private internet access", "purevpn"
        ]
 
        # Improved VPN detection logic
        isp_lower = (isp or "").lower()
        if (
            any(k in isp_lower for k in vpn_indicators)
            or public_ip.startswith(("212.", "185.", "89.", "37."))  # Common ProtonVPN IP ranges
        ):
            print("✅ VPN is likely ON (Public IP belongs to a VPN or hosting provider)")
        else:
            print("❌ VPN is likely OFF (Public IP belongs to a regular ISP)")
 
    except Exception as e:
        print(f"⚠️ Error checking ISP info: {e}")
 
 
# Run
if __name__ == "__main__":
    check_vpn_status()
 
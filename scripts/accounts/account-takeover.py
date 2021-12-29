r =0x69a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166
s1=0x7724cedeb923f374bef4e05c97426a918123cc4fec7b07903839f12517e1b3c8
s2=0x2bbd9c2a6285c2b43e728b17bda36a81653dd5f4612a2e0aefdb48043c5108de
z1=0x350f3ee8007d817fbd7349c477507f923c4682b3e69bd1df5fbb93b39beb1e04
z2=0x4f6a8370a435a27724bbc163419042d71b6dcbeb61c060cc6816cda93f57860c

# This function is from
# https://github.com/tlsfuzzer/python-ecdsa/blob/master/src/ecdsa/numbertheory.py
def inverse_mod(a, m):
    """Inverse of a mod m."""
    if a == 0:  # pragma: no branch
        return 0
    return pow(a, -1, m)

# Magic: https://en.bitcoin.it/wiki/Secp256k1
p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

for (i, j) in [(1,1),(1,-1),(-1,1),(-1,-1)]:
    z = z1 - z2
    s = s1*i + s2*j
    r_inv = inverse_mod(r, p)
    s_inv = inverse_mod(s, p)
    k = (z * s_inv) % p
    d = (r_inv * (s1 * k - z1)) % p
    print(f"Private key: {hex(d)}, {hex(k)}")

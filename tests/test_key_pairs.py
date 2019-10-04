from xpring import key_pairs


def test_ed25519_key_pair():
    seed = 'sEdSKaCy2JT7JaM7v95H9SxkhP9wS2r'
    key_pair = key_pairs.derive_key_pair(seed)
    assert str(
        key_pair.public_key
    ) == 'ED01FA53FA5A7E77798F882ECE20B1ABC00BB358A9E55A202D0D0676BD0CE37A63'
    assert str(
        key_pair.private_key
    ) == 'EDB4C4E046826BD26190D09715FC31F4E6A728204EADD112905B08B14B7F15C4F3'

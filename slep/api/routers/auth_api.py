from ninja import Router

router = Router()


@router.get('/test123')
def test(request):
    return 'done'

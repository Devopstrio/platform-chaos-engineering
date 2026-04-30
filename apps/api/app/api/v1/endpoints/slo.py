from fastapi import APIRouter
router = APIRouter()
@router.get('/status')
def get_slo_status():
    return {'status': 'COMPLIANT', 'error_budget': '99.9%'}

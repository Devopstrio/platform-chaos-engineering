from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/create')
def create_experiment(data: dict = Body(...)):
    return {'status': 'created', 'id': 'exp-123'}
@router.post('/run')
def run_experiment(data: dict = Body(...)):
    return {'status': 'initiated', 'execution_id': 'run-456'}
@router.post('/rollback')
def rollback_experiment():
    return {'status': 'rolling_back'}

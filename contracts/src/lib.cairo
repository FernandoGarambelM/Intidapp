// Smart Contract de Progreso para IntiDapp
// Este contrato guarda el progreso de cada estudiante

#[starknet::interface]
trait IIntiProgress<TContractState> {
    fn complete_mission(ref self: TContractState, points: u128);
    fn get_progress(self: @TContractState, student: starknet::ContractAddress) -> u128;
}

#[starknet::contract]
mod inti_progress {
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use starknet::get_caller_address;
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        // Mapeo: dirección de estudiante → puntos totales
        student_points: Map<ContractAddress, u128>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        MissionCompleted: MissionCompleted,
    }

    #[derive(Drop, starknet::Event)]
    struct MissionCompleted {
        student: ContractAddress,
        points_earned: u128,
        total_points: u128,
    }

    #[abi(embed_v0)]
    impl IntiProgressImpl of super::IIntiProgress<ContractState> {
        // Función: Completar misión y sumar puntos
        fn complete_mission(ref self: ContractState, points: u128) {
            let student = get_caller_address();
            let current_points = self.student_points.read(student);
            let new_total = current_points + points;
            
            // Guardar nuevo total
            self.student_points.write(student, new_total);
            
            // Emitir evento
            self.emit(MissionCompleted {
                student: student,
                points_earned: points,
                total_points: new_total,
            });
        }

        // Función: Consultar progreso de estudiante
        fn get_progress(self: @ContractState, student: ContractAddress) -> u128 {
            self.student_points.read(student)
        }
    }
}

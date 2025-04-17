<template>
    <div class="card">
        <div class="card-header">
            <h3>Recent Transactions</h3>
            <button class="btn btn-text">View All</button>
        </div>
        <div class="transactions-list">
            <div
                class="transaction-item"
                v-for="(transaction, index) in recentTransactions"
                :key="index"
            >
                <div class="transaction-icon" :class="transaction.iconBg">
                    <component
                        :is="transaction.icon"
                        :size="20"
                        :class="transaction.iconColor"
                    />
                </div>
                <div class="transaction-details">
                    <h4>{{ transaction.title }}</h4>
                    <p>{{ transaction.date }}</p>
                </div>
                <div
                    class="transaction-amount"
                    :class="transaction.amountClass"
                >
                    {{ transaction.amount }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { CreditCard, RefreshCw, Send } from "lucide-vue-next";

// Sample data for recent transactions
const recentTransactions = ref([
    {
        title: "Payment from John Doe",
        date: "Apr 25, 2023 • 12:48 PM",
        amount: "+$850.00",
        icon: CreditCard,
        iconBg: "bg-primary-light",
        iconColor: "text-primary",
        amountClass: "text-success",
    },
    {
        title: "Payment refund to #4832",
        date: "Apr 22, 2023 • 09:25 AM",
        amount: "-$450.00",
        icon: RefreshCw,
        iconBg: "bg-warning-light",
        iconColor: "text-warning",
        amountClass: "text-danger",
    },
    {
        title: "Payment failed from #6755",
        date: "Apr 18, 2023 • 03:16 PM",
        amount: "$605.50",
        icon: CreditCard,
        iconBg: "bg-danger-light",
        iconColor: "text-danger",
        amountClass: "text-muted",
    },
    {
        title: "Subscription payment",
        date: "Apr 12, 2023 • 05:50 PM",
        amount: "+$99.00",
        icon: Send,
        iconBg: "bg-success-light",
        iconColor: "text-success",
        amountClass: "text-success",
    },
]);
</script>

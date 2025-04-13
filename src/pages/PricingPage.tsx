
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Info, 
  CreditCard, 
  Shield, 
  BookOpen, 
  Image, 
  FileText, 
  Sparkles, 
  Download,
  Star,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const yearlyDiscount = 0.2; // 20% discount
  
  const getPlanPrice = (basePrice: number) => {
    if (billingCycle === 'yearly') {
      const discountedPrice = basePrice * 12 * (1 - yearlyDiscount);
      return `$${discountedPrice.toFixed(0)}`;
    }
    return `$${basePrice}`;
  };
  
  const plans = [
    {
      name: 'Free',
      description: 'For occasional book creators',
      basePrice: 0,
      features: [
        { icon: <BookOpen className="h-4 w-4" />, text: '1 book generation per month' },
        { icon: <FileText className="h-4 w-4" />, text: 'Max 20 pages' },
        { icon: <Download className="h-4 w-4" />, text: 'PDF export only' },
        { icon: <Image className="h-4 w-4" />, text: 'Limited image generation (1 image per book)' },
        { icon: <CreditCard className="h-4 w-4" />, text: 'Watermarked export' }
      ],
      ctaText: 'Start for Free',
      ctaLink: '/create',
      popular: false,
      variant: 'outline' as const
    },
    {
      name: 'Creator',
      description: 'For serious book creators',
      basePrice: 9,
      features: [
        { icon: <BookOpen className="h-4 w-4" />, text: '15 books per month' },
        { icon: <FileText className="h-4 w-4" />, text: 'Up to 200 pages per book' },
        { icon: <Download className="h-4 w-4" />, text: 'PDF, EPUB, DOCX export' },
        { icon: <Image className="h-4 w-4" />, text: 'Unlimited image generation' },
        { icon: <CreditCard className="h-4 w-4" />, text: 'No watermarks' },
        { icon: <Star className="h-4 w-4" />, text: 'Priority support' }
      ],
      ctaText: 'Upgrade Now',
      ctaLink: '/login',
      popular: true,
      variant: 'secondary' as const
    },
    {
      name: 'Pro',
      description: 'For professional authors',
      basePrice: 19,
      features: [
        { icon: <BookOpen className="h-4 w-4" />, text: 'Unlimited book creation' },
        { icon: <FileText className="h-4 w-4" />, text: 'Up to 500 pages per book' },
        { icon: <Download className="h-4 w-4" />, text: 'All export formats (PDF, EPUB, DOCX)' },
        { icon: <Sparkles className="h-4 w-4" />, text: 'AI-assisted content editing' },
        { icon: <Image className="h-4 w-4" />, text: 'AI image generation with HD export' },
        { icon: <Briefcase className="h-4 w-4" />, text: 'Commercial use license' },
        { icon: <CreditCard className="h-4 w-4" />, text: 'Custom cover designer' },
        { icon: <Star className="h-4 w-4" />, text: 'Priority support' }
      ],
      ctaText: 'Get Pro',
      ctaLink: '/login',
      popular: false,
      variant: 'default' as const
    }
  ];
  
  const faqs = [
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes, you can upgrade your plan at any time. Your new benefits will be available immediately after upgrading.'
    },
    {
      question: 'What happens when I reach my monthly book limit?',
      answer: 'You\'ll receive a notification when approaching your limit. To create more books, you\'ll need to upgrade your plan or wait until your limit resets the following month.'
    },
    {
      question: 'Are there any refunds available?',
      answer: 'We offer a 14-day money-back guarantee if you\'re not satisfied with your subscription. Contact our support team for assistance.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-accent/50 py-16 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose the Right Plan for You</h1>
            <p className="text-muted-foreground text-lg mb-8">Flexible pricing based on how often you create books.</p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={cn("font-medium", billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground')}>
                Monthly
              </span>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle 
                      pressed={billingCycle === 'yearly'} 
                      onPressedChange={(pressed) => setBillingCycle(pressed ? 'yearly' : 'monthly')}
                      className="px-4 data-[state=on]:bg-primary"
                    >
                      <span className="sr-only">Toggle billing cycle</span>
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch between monthly and yearly billing</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="flex items-center gap-2">
                <span className={cn("font-medium", billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground')}>
                  Yearly
                </span>
                <Badge variant="secondary" className="bg-purple-light text-purple-dark">Save 20%</Badge>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div key={index} className="flex">
                  <Card className={cn(
                    "w-full transition-all duration-300 hover:shadow-lg", 
                    plan.popular && "border-purple border-2 shadow-md",
                    "hover:-translate-y-1"
                  )}>
                    <CardHeader>
                      {plan.popular && (
                        <Badge className="w-fit mb-2 bg-purple text-white">Most Popular</Badge>
                      )}
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{getPlanPrice(plan.basePrice)}</span>
                        {plan.basePrice > 0 && (
                          <span className="text-muted-foreground ml-1">
                            /{billingCycle === 'yearly' ? 'year' : 'mo'}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-purple mt-0.5">{feature.icon}</span>
                            <span>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant={plan.variant} 
                        className={cn(
                          "w-full",
                          plan.variant === 'default' && "bg-purple hover:bg-purple/90",
                          plan.variant === 'secondary' && "bg-secondary hover:bg-secondary/90"
                        )}
                        asChild
                      >
                        <Link to={plan.ctaLink}>
                          {plan.ctaText}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 mt-12 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Secure checkout • 14-day money-back guarantee</span>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4 bg-accent/30">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="card p-6">
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            {/* Contact Support */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Have more questions? We're here to help.</p>
              <Button variant="outline">Contact Support</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
